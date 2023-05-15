import { toTitleCase } from "@/app/lib/text-utilities";

export default function Select({ name, handleChange, value, options }) {
  return (
    <label htmlFor={name}>
      {toTitleCase(name)}
      <select name={name} id={name} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>{toTitleCase(option)}</option>
        ))}
      </select>
    </label>
  );
}
