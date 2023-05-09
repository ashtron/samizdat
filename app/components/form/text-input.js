import { capitalizeFirstLetter } from "@/app/lib/text-utilities";

export default function TextInput(props) {
  return (
    <label htmlFor={props.id}>
      {capitalizeFirstLetter(props.id)}
      <input
        type="text"
        id={props.id}
        name={props.id}
        placeholder={capitalizeFirstLetter(props.id)}
      />
    </label>
  );
}
