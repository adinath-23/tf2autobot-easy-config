import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { optionActions } from "../store/options-ctx";
import MultipleSelect from "./SelectList/MultipleSelect";
import Dropdown from "./Dropdown";
import DescriptionButton from "./Description/DescriptionButton";
import CopyButton from "./CopyButton";

const Input = ({ type, label, value, id, isChecked, isList, description }) => {
  const [copiedData, setCopiedData] = useState("");
  const dispatch = useDispatch();
  const keyValue = description ? description["keyvalues"] : null;

  //function to set copieddata to clipboard
  const copyData = () => {
    navigator.clipboard.writeText(copiedData);
  };

  useEffect(() => {
    setCopiedData(`!config ${id.replaceAll("_", ".")}=${value}`);
  }, [id]);

  const handleChange = (event) => {
    let inputValue = event.target.value;
    if (event.target.type === "number") {
      inputValue = +inputValue;
    }
    if (event.target.type === "checkbox") {
      inputValue = event.target.checked;
    }
    setCopiedData(`!config ${id.replaceAll("_", ".")}=${inputValue}`);
    dispatch(
      optionActions.editOption({
        optionValue: inputValue,
        optionKeys: id,
      })
    );
  };

  //this functions sets current description
  const handleEnter = () => {
    dispatch(optionActions.setCurrentDescription({ id, description }));
  };

  //function to get tags from the createList component
  const handleTags = (data) => {
    setCopiedData(`!config ${id.replaceAll("_", ".")}=${JSON.stringify(data)}`);
    dispatch(
      optionActions.editOption({
        optionValue: data,
        optionKeys: id,
      })
    );
  };

  //gets data from select component and sets it to copied data and updates edited options
  const handleSelect = (data) => {
    setCopiedData(`!config ${id.replaceAll("_", ".")}=${data}`);
    dispatch(
      optionActions.editOption({
        optionValue: data,
        optionKeys: id,
      })
    );
  };

  return (
    <li
      className="p-1 flex my-1 flex-wrap align-middle group/option"
      onMouseEnter={handleEnter}
    >
      <label
        htmlFor={id}
        className={`text-slate-200 flex-1/2  hover:cursor-pointer self-center  ${
          type === "checkbox" ? "order-2 ml-2" : "md:mr-2"
        }  `}
      >
        {label}
      </label>
      <DescriptionButton
        externalClasses={`${type === "checkbox" && "order-3"} md:hidden`}
      />
      <CopyButton
        onClick={copyData}
        classes={`mr-1 ${type === "checkbox" && "order-3 ml-3"}`}
      />
      {isList && (
        <MultipleSelect
          label={label}
          id={id}
          sendTags={handleTags}
          options={description ? description.options : null}
        />
      )}

      {!isList && !keyValue && (
        <input
          onChange={handleChange}
          className={`
          bg-slate-900 text-slate-200
          mx-1
          rounded-md border-slate-500 border hover:outline-none outline-none
          hover:border-lime-300 
          pl-2 py-0.5
          placeholder:italic
          placeholder:text-slate-600
          accent-lime-500
          ${type === "text" ? "flex-1 order-4 md:order-none" : ""}
          `}
          type={type}
          defaultChecked={isChecked}
          id={id}
          defaultValue={value}
        />
      )}
      {keyValue && (
        <Dropdown
          options={keyValue}
          id={id}
          defaultValue={value}
          sendSelected={handleSelect}
        />
      )}
    </li>
  );
};

export default Input;
