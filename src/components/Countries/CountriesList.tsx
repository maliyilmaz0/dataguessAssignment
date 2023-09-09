import React, { useState, useEffect, useMemo } from "react";
import "./CountriesList.css";
import Card from "../UI/Card";

const Colors = ["#FF5733", "#33FF6F", "#336BFF", "#FF33C7", "#FFBF33"];

const CountriesList = ({ items }) => {
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    currencyFilter: "",
    nameFilter: "",
  });

  const [selectedItem, setSelectedItem] = useState({
    index: 9,
    color: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemColor, setSelectedItemColor] = useState("");

  const { currencyFilter, nameFilter } = filters;
  const { index: selectedItemIndex } = selectedItem;

  useEffect(() => {
    if (filteredCountries.length < 10) {
      setSelectedItem({
        index: filteredCountries.length - 1,
        color: generateRandomColor,
      });
    } else {
      setSelectedItem({ index: 9, color: "" });
    }
  }, [currencyFilter, nameFilter]);

  const filteredCountries = useMemo(() => {
    return items.filter((country) => {
      const currency = country.currency || "";
      const title = country.title || "";

      return (
        currency.toLowerCase().includes(currencyFilter.toLowerCase()) &&
        title.toLowerCase().includes(nameFilter.toLowerCase())
      );
    });
  }, [currencyFilter, nameFilter, items]);

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(
    startIndex + itemsPerPage,
    filteredCountries.length
  );

  const generateRandomColor = () => {
    let randomColor;
    do {
      randomColor = Colors[Math.floor(Math.random() * Colors.length)];
    } while (randomColor === selectedItemColor);
    setSelectedItemColor(randomColor);
  };

  const handleItemClick = (index, country) => {
    if (index === selectedItemIndex) {
      setSelectedItem({ index: -1, color: "" });
      setSelectedItemColor(""); // Clear color
    } else {
      setSelectedItem({ index, color: generateRandomColor() });
    }
    console.log(country);
  };

  return (
    <div className="country-list">
      <div className="filter-container">
        <div>
          <h2 className="namefilterH2">Ülke İsmine Göre Filtreleme</h2>
          <input
            type="text"
            className="name-filter"
            value={nameFilter}
            onChange={(e) =>
              setFilters({ ...filters, nameFilter: e.target.value })
            }
          />
        </div>
        <div>
          <h2 className="namefilterH2">Ülke Kuruna Göre Filtreleme</h2>
          <input
            type="text"
            className="currency-filter"
            value={currencyFilter}
            onChange={(e) =>
              setFilters({ ...filters, currencyFilter: e.target.value })
            }
          />
        </div>
      </div>
      <ul>
        {filteredCountries.slice(startIndex, endIndex).map((country, index) => (
          <CountryListItem
            key={country.id}
            country={country}
            index={startIndex + index}
            isSelected={startIndex + index === selectedItemIndex}
            color={selectedItemColor}
            onClick={handleItemClick}
          />
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Önceki
        </button>
        <span>
          {startIndex + 1} - {endIndex} of {filteredCountries.length}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

const CountryListItem = ({ country, index, isSelected, color, onClick }) => (
  <li key={country.id} onClick={() => onClick(index, country)}>
    <Card
      className={isSelected ? "selected" : "country-item"}
      backgroundColor={isSelected ? color : ""}
    >
      <div className="country-item__description">
        <h2>{country.title}</h2>
      </div>
    </Card>
  </li>
);

export default CountriesList;
