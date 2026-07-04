export default function SportLevelSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-[#1e293b] border border-cyan-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
    >
      <option value="">Sport Level</option>
      <option>Beginner</option>
      <option>District Level</option>
      <option>State Level</option>
      <option>National Level</option>
    </select>
  );
}
