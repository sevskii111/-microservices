import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GoodForm from "../components/GoodForm";
import { Http } from "../httpService";

const Edit = () => {
  const id = useLocation().pathname.split("/").pop();
  const [good, setGood] = useState(null);

  const http = new Http({ auth: true });

  useEffect(() => {
    async function fetchGood() {
      const res = await new Http({ auth: true }).get(`/goods/${id}`);
      setGood(res.data);
    }
    fetchGood();
  }, [id]);

  console.log(good);

  return good ? (
    <GoodForm
      {...good}
      http={http}
      url={`/goods/${id}`}
      btnText="Edit"
      method="PATCH"
    />
  ) : null;
};

export default Edit;
