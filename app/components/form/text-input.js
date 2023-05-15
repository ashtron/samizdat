import { toTitleCase } from "@/app/lib/text-utilities";

export default function TextInput({ name, handleChange, value }) {
  return (
    <label htmlFor={name}>
      {toTitleCase(name)}
      <input
        type="text"
        name={name}
        placeholder={toTitleCase(name)}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}
