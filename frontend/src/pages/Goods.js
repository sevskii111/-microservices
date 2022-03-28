import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { Http } from "../httpService";
import { userContext } from "../userContext";

const Good = ({ ID, Name, Description, Price, InStock }) => {
  return (
    <Card style={{ width: "50rem" }} className="m-auto">
      <CardBody>
        <CardTitle>
          <h3>{Name}</h3>
        </CardTitle>
        <CardText>{Description}</CardText>
        {InStock ? (
          <Button color="primary">Available for {Price}$</Button>
        ) : (
          <Button>Out of stock</Button>
        )}
        <userContext.Consumer>
          {(user) => {
            if (user.IsAdmin) {
              return (
                <>
                  <br />
                  <a href={`/edit/${ID}`}>
                    <Button size="sm" color="success">
                      Edit
                    </Button>
                  </a>
                </>
              );
            }
          }}
        </userContext.Consumer>
      </CardBody>
    </Card>
  );
};

const Goods = () => {
  const [goods, setGoods] = useState([]);
  useEffect(() => {
    async function fetchGoods() {
      const res = await new Http({ auth: true }).get("/goods");
      setGoods(res.data);
    }
    fetchGoods();
  }, []);

  return (
    <div>
      <div className="my-2">
        {goods.map((good) => (
          <Good {...good} />
        ))}
      </div>
      <userContext.Consumer>
        {(user) => {
          if (user.IsAdmin) {
            return (
              <a href="/create">
                <Button size="lg" color="success">
                  Add new good
                </Button>
              </a>
            );
          }
        }}
      </userContext.Consumer>
    </div>
  );
};

export default Goods;
