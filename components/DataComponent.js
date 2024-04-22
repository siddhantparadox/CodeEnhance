// components/DataComponent.js
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";

function DataComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("table").select("*");
      if (error) {
        console.error("Error:", error);
      } else {
        setData(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}

export default DataComponent;
