import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import _ from "lodash";
import Table, { SortColumn } from "./Table";
import { useHistory } from "react-router-dom";
import "../App.css";
import Pagination from "../Pagination";
function App() {
  interface FormData {
    url: string;
    box: boolean;
    date: string;
  }
  let history = useHistory();
  const [selectedPage, setSelectedPage] = useState(1);
  const [date, setDate] = useState("");
  const [urlList, setUrlList] = useState([]);
  const [formData, setFormData] = useState<FormData>({
    url: "",
    box: false,
    date: "",
  });

  const [sortColumn, setSortColumn] = useState<SortColumn>({
    order: "asc",
    path: "client.name",
  });

  useEffect(() => {
    getUrl();
  }, []);
  const handleSort = (sortColumn: SortColumn) => setSortColumn(sortColumn);

  async function getUrl() {
    const { data } = await axios.get("http://localhost:4000/api/short");
    return setUrlList(data);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    //@ts-ignore
    formData[name] = value;
    console.log(formData.date);
    setFormData({ ...formData });
  }

  function handleSubmit(data: FormData) {
    if (formData.box) {
      axios.post("http://localhost:4000/api/short", {
        original: formData.url,
        validTo: formData.date,
      });
    } else
      axios.post("http://localhost:4000/api/short", {
        original: formData.url,
        validTo: null,
      });
  }

  function handleBox(e: React.ChangeEvent<HTMLInputElement>) {
    const data = (formData.box = !formData.box);
    return setFormData({ ...formData });
  }

  async function handleUrl(item: any) {
    console.log(item.newUrl);
    window.location.href = `${item.newUrl}`;
    await axios.get(`http://localhost:4000/${item.addon}`);
  }

  async function handleDelete(id: string) {
    const url = await axios.delete("http://localhost:4000/api/short/" + id);
    let newUrl = urlList.filter((u: any) => u._id !== id);
    return setUrlList(newUrl);
  }

  const columns = [
    {
      path: "original",
      label: "Original Url",
    },
    {
      path: "newUrl",
      label: "newUrl",
    },

    {
      path: "validTo",
      label: "valid to",
    },

    {
      key: "id",
      label: "To link",
      content: (item: any) => (
        <>
          {
            <button className="Link" onClick={() => handleUrl(item)}>
              Go to link
            </button>
          }
        </>
      ),
    },
    {
      key: "id+addon",
      label: "Delete",
      content: (item: any) => (
        <>
          {
            <button className="Delete" onClick={() => handleDelete(item._id)}>
              X
            </button>
          }
        </>
      ),
    },
  ];

  const sortedOrders = _.orderBy(
    urlList,
    [sortColumn.path],
    [sortColumn.order]
  );

  const handlePageChange = async (page: any) => {
    setSelectedPage(page);
    console.log(page);
    const startIndex = (page - 1) * 10;
    const endIndex = page * 10;
    setUrlList(urlList.slice(startIndex, endIndex));
  };

  return (
    <div>
      <Back>
        <form>
          <input
            className="url"
            name={"url"}
            type={"url"}
            onChange={handleChange}
            placeholder={"Enter Url"}
          ></input>
          <label>
            Use date
            <input
              className="box"
              type="checkbox"
              defaultChecked={formData.box}
              onChange={handleBox}
            />
          </label>
          {formData.box && (
            <input
              className="date"
              name={"date"}
              type={"date"}
              onChange={handleChange}
            ></input>
          )}
          <button className="Send" onClick={() => handleSubmit(formData)}>
            Shorten Url
          </button>
        </form>
        <Table
          columns={columns}
          data={sortedOrders}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
      </Back>
      <Pagination
        itemCount={urlList.length}
        pageSize={10}
        selectedPage={selectedPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;

const Back = styled.div`
  height: 110%;
  width: 90vw;
  margin-top: 20px;
  margin-left: 70px;
  background-color: rgb(128, 128, 128);

  .Send {
    height: 50px;
    width: 150px;
    margin-left: 20px;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      190deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(0, 0, 0, 1) 42%,
      rgba(0, 212, 255, 1) 100%
    );
    filter: drop-shadow(10px 5px 4px black);
    position: relative;
    color: white;
    box-shadow: 0 0 50px white;
    border-radius: 32px;
    :hover {
      height: 55px;
      width: 155px;
    }
  }

  .Delete {
    position: relative;
    display: inline-block;
    border-radius: 5px;
    height: 25px;
    width: 30px;
    background-image: linear-gradient(red, #f77793);
    text-decoration: none;
    color: black;
    font-size: 12px;
    font-family: sans-serif;
    font-weight: 100;
  }
  .Link {
    position: relative;
    z-index: 10;
    width: 200px;
    height: 30px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 1rem;
    letter-spacing: 1px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    outline: none;
    cursor: pointer;
  }
  .Link::before {
    position: absolute;
    top: 15px;
    left: 50px;
    z-index: -1;
    width: 100px;
    height: 20px;
    border-radius: 50px;
    background-color: #d0cbde52;
    filter: blur(10px);
    content: "";
    transition: 0.5s;
  }
  .Link:hover::before {
    transform: scale(2);
  }

  .url {
    height: 30px;
    width: 400px;
    position: relative;
    margin-left: 400px;
    margin-top: 120px;
    margin-right: 20px;
  }
  .date {
    height: 30px;
    width: 100px;
    position: relative;
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 20px;
    padding: 0px;
  }
  .box {
    height: 30px;
    width: 30px;
    position: absolute;
    margin-left: 10px;
    margin-top: 125px;
    margin-right: 1200px;
  }
  label {
    color: white;
    margin-right: 40px;
  }
  Table {
    margin-top: 120px;
    height: 585px;
  }
`;
