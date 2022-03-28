import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Error from "../components/Error";

const GoodForm = ({
  Name,
  Description,
  Price,
  InStock,
  btnText,
  http,
  url,
  method,
}) => {
  const [name, setName] = useState(Name || "");
  const [description, setDescription] = useState(Description || "");
  const [price, setPrice] = useState(Price || 0);
  const [inStock, setInStock] = useState(
    InStock === undefined ? true : InStock
  );

  const [genericErrors, setGenericErrors] = useState([]);
  const [nameErrors, setNameErrors] = useState([]);
  const [descriptionErrors, setDescriptionErrors] = useState([]);
  const [priceErrors, setPriceErrors] = useState([]);
  const [inStockErrors, setInStockErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = {
      name,
      description,
      price,
      inStock,
    };

    const paramsStr = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");

    const options = {
      method: method,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: paramsStr,
      url: url,
      withCredentials: true,
    };

    console.log(http);
    const response = await http(options);

    const { data } = response;

    if (!data.Success) {
      setGenericErrors(data.Errors.generic || []);
      setNameErrors(data.Errors.name || []);
      setDescriptionErrors(data.Errors.description || []);
      setPriceErrors(data.Errors.price || []);
      setInStockErrors(data.Errors.inStock || []);
    } else {
      window.location.href = "/";
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ width: "50rem" }}
      className="m-auto my-2 border border-secondary p-2"
    >
      {genericErrors.map((err) => (
        <Error error={err} key={err} />
      ))}
      <FormGroup>
        <Label for="name">Name</Label>
        {nameErrors.map((err) => (
          <Error error={err} key={err} />
        ))}
        <Input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        {descriptionErrors.map((err) => (
          <Error error={err} key={err} />
        ))}
        <Input
          type="textarea"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="price">Price</Label>
        {priceErrors.map((err) => (
          <Error error={err} key={err} />
        ))}
        <Input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          {inStockErrors.map((err) => (
            <Error error={err} key={err} />
          ))}
          <Input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(!inStock)}
          />{" "}
          Is in stock
        </Label>
      </FormGroup>
      <Button color="primary">{btnText}</Button>
    </Form>
  );
};

export default GoodForm;
