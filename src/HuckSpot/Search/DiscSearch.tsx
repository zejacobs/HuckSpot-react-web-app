import { useState } from "react";
import { useNavigate } from "react-router";

export default function DiscSearch() {
  const [searchParams, setSearchParams] = useState({ name: "", brand: "", category: "", speed: "", glide: "", turn: "", fade: "", stability: "" });

  const navigate = useNavigate();

  const formatQueryString = () => {
    const query = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        query.append(key, value);
      }
    });
    return query;
  };
  const submitDiscSearch = () => {
    const queryString = formatQueryString();
    navigate(`./Discs?${queryString}`);
  };
  return (
    <>
      <h2>Disc Search</h2> <br />
      <div className="container">
        <h4>Search Citeria</h4>
        <div className="form-group row mt-2">
          <label htmlFor="search-name" className="col-2 col-form-label">
            Name
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="search-name"
              placeholder="Name"
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  name: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-brand" className="col-2 col-form-label">
            Brand
          </label>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="search-brand"
              placeholder="Brand"
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  brand: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-cat" className="col-2 col-form-label">
            Category
          </label>
          <div className="col-sm-4">
            <select
              className="form-select"
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  category: e.target.value,
                })
              }
            >
              <option value="">None</option>
              <option value="Putter">Putter</option>
              <option value="Approach">Approach</option>
              <option value="Midrange">Midrange</option>
              <option value="Control">Control Driver</option>
              <option value="Distance">Distance Driver</option>
            </select>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="search-speed" className="col-2 col-form-label">
              Speed
            </label>
            <div className="col-sm-4">
              <input
                type="Number"
                className="form-control"
                id="search-speed"
                placeholder="1 to 14"
                min={"1"}
                max={"14"}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    speed: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="search-glide" className="col-2 col-form-label">
              Glide
            </label>
            <div className="col-sm-4">
              <input
                type="Number"
                className="form-control"
                id="search-glide"
                placeholder="1 to 7"
                min={"1"}
                max={"7"}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    glide: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="search-turn" className="col-2 col-form-label">
              Turn
            </label>
            <div className="col-sm-4">
              <input
                type="Number"
                className="form-control"
                id="search-turn"
                placeholder="-5 to 1"
                min={"-5"}
                max={"1"}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    turn: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="search-fade" className="col-2 col-form-label">
              Fade
            </label>
            <div className="col-sm-4">
              <input
                type="Number"
                className="form-control"
                id="search-fade"
                placeholder="0 to 5"
                min={"0"}
                max={"5"}
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    fade: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="search-stability" className="col-2 col-form-label">
              Stability
            </label>
            <div className="col-sm-4">
              <select
                className="form-select"
                onChange={(e) =>
                  setSearchParams({
                    ...searchParams,
                    stability: e.target.value,
                  })
                }
              >
                <option value="">None</option>
                <option value="Understable">Understable</option>
                <option value="Stable">Stable</option>
                <option value="Overstable">Overstable</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary mt-4" onClick={submitDiscSearch}>
          Submit Disc Search
        </button>
      </div>
    </>
  );
}
