import { useState, useCallback } from "react";

function useInputs(initialForm) {
  const [form, setForm] = useState(initialForm);
  
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  return [form, onChange, setForm];
}

export default useInputs;
