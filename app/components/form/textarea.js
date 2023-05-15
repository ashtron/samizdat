import { toTitleCase } from "@/app/lib/text-utilities";

export default function TextAreaInput({ name, handleChange, value }) {
  return (
    <div>
      <label htmlFor={name}>
        {toTitleCase(name)}
        <textarea
          name={name}
          id={name}
          rows="5"
          value={value}
          onChange={handleChange}
        ></textarea>
      </label>
    </div>
  );
}
