import { useField } from "formik";

export function Input(props) {
  const [field, meta] = useField(props.name);
  return (
    <>
      {props.label && <label htmlFor={props.name} className="font-[600] text-[24px]">{props.label}</label>}
      <div className=" py-[16px] px-[12px] flex gap-[12px] border-[1px] border-[#87878766] rounded-[15px]">
        <input
          {...field}
          {...props}
          className="font-['Inter'] font-[200] text-[24px] leading-[29px] w-full "
        />
      </div>
      {meta.error && meta.touched && (
        <p className=" text-red-600">{meta.error}</p>
      )}
    </>
  );
}
