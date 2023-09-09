import Card from "../UI/Card";
import "./Countries.css";
import CountriesList from "./CountriesList";
const Countries = (props) => {
  return (
    <div>
      <Card className="countries">
        <CountriesList items={props.items} />
      </Card>
    </div>
  );
};

export default Countries;
