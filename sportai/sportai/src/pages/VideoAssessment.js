import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Video, UploadCloud, Activity, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function VideoAssessment() {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleUploadClick = () => {
    document.getElementById('videoUpload').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
      stopCamera();
    }
  };

  const startCamera = async () => {
    try {
      setVideoUrl(null);
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(newStream);
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please ensure you have granted permission.");
    }
  };

  const startRecording = () => {
    if (!stream) return;
    setIsRecording(true);
    chunksRef.current = [];

    // Detect best supported mime type for the current browser
    const types = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm',
      'video/mp4',
      'video/quicktime'
    ];
    
    let selectedType = '';
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        selectedType = type;
        break;
      }
    }

    let mediaRecorder;
    try {
      mediaRecorder = new MediaRecorder(stream, selectedType ? { mimeType: selectedType } : {});
    } catch (err) {
      console.error("MediaRecorder creation failed:", err);
      mediaRecorder = new MediaRecorder(stream);
    }
    
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      const finalType = mediaRecorder.mimeType || selectedType || 'video/webm';
      const blob = new Blob(chunksRef.current, { type: finalType });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      
      // Stop the stream tracks after creating the blob
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    };

    // Start recording - no timeslice for maximum header compatibility
    mediaRecorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const clearVideo = () => {
    setVideoUrl(null);
    stopCamera();
  };

  const handleUpload = () => {
    setIsProcessing(true);
    stopCamera();
    // Simulate AI Processing delay
    setTimeout(() => {
      navigate('/results');
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="min-h-screen pt-28 pb-12 px-6 flex flex-col items-center justify-center bg-slate-900"
    >
      <div className="max-w-3xl w-full bg-slate-800/50 backdrop-blur-md rounded-2xl border border-blue-500/20 p-8 shadow-xl text-center">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/start-assessment')} className="text-slate-400 hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold text-white">Video Assessment</h2>
          <div className="w-6" />
        </div>
        
        {!isProcessing ? (
          <>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Upload an existing video or record a new one directly. Our AI will perform detailed pose estimation and compile a biomechanical analysis of your performance.
            </p>

            {videoUrl ? (
              <div className="mb-8 relative rounded-xl overflow-hidden bg-slate-900 flex justify-center border border-slate-700 p-2 min-h-[300px] items-center">
                <button 
                  onClick={clearVideo} 
                  className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <video 
                  key={videoUrl}
                  src={videoUrl} 
                  controls 
                  playsInline
                  className="max-h-[400px] w-full h-full object-contain rounded-lg mx-auto" 
                />
              </div>
            ) : stream ? (
              <div className="mb-8 flex flex-col items-center relative rounded-xl border border-slate-700 p-2 bg-slate-900">
                <button 
                  onClick={clearVideo} 
                  className="absolute top-4 right-4 bg-slate-500 text-white rounded-full p-1 hover:bg-slate-600 transition-colors z-10"
                >
                  <X size={20} />
                </button>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="max-h-[400px] w-auto h-auto rounded-lg mb-4" 
                />
                {!isRecording ? (
                  <button 
                    onClick={startRecording} 
                    className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transform transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                  >
                    <Video size={20} /> Start Recording
                  </button>
                ) : (
                  <button 
                    onClick={stopRecording} 
                    className="bg-red-600 hover:bg-red-500 active:bg-red-700 animate-pulse text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transform transition-all active:scale-95 shadow-lg shadow-red-500/30"
                  >
                    <div className="w-3 h-3 bg-white rounded-full" /> Stop Recording
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Upload Section */}
                  <input type="file" id="videoUpload" accept="video/mp4,video/x-m4v,video/*" className="hidden" onChange={handleFileChange} />
                  <div onClick={handleUploadClick} className="border-2 border-dashed border-slate-600 rounded-2xl p-8 hover:border-blue-500 hover:bg-slate-800/80 transition-all cursor-pointer group flex flex-col items-center justify-center">
                    <div className="bg-slate-900 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud size={32} className="text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Upload Video</h3>
                    <p className="text-slate-400 text-xs mb-4">MP4, MOV (Max 50MB)</p>
                    <button className="bg-slate-700 group-hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                        Browse Files
                    </button>
                  </div>

                  {/* Record Section */}
                  <div onClick={startCamera} className="border-2 border-dashed border-slate-600 rounded-2xl p-8 hover:border-rose-500 hover:bg-slate-800/80 transition-all cursor-pointer group flex flex-col items-center justify-center">
                    <div className="bg-slate-900 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                        <Video size={32} className="text-rose-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Record Video</h3>
                    <p className="text-slate-400 text-xs mb-4">Uses your device camera</p>
                    <button className="bg-slate-700 group-hover:bg-rose-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                        Open Camera
                    </button>
                  </div>
              </div>
            )}

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 flex items-start gap-4 text-left mb-8">
              <Activity className="text-blue-400 shrink-0 mt-1" size={20} />
              <div>
                  <h4 className="text-blue-200 font-semibold text-sm">AI Estimation Features</h4>
                  <p className="text-slate-400 text-xs mt-1">SportGrit will automatically map 33 key physical joints in your video, generating a performance score, benchmarking against similar athletes, and producing actionable recommendations.</p>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <button 
                onClick={handleUpload}
                disabled={!videoUrl}
                className={`${videoUrl ? 'bg-blue-600 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25' : 'bg-slate-600 text-slate-400 cursor-not-allowed'} text-white font-bold py-4 px-12 rounded-full flex items-center gap-3 transition-all text-lg`}
              >
                Analyze Video with AI <CheckCircle size={22} />
              </button>
            </div>
          </>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center">
            <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-400 rounded-full animate-spin mb-8" />
            <h3 className="text-3xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Estimating Pose Mechanics...</h3>
            <p className="text-slate-400 text-lg">Running deep learning models to generate your dashboard.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}