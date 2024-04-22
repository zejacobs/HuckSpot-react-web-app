function Search() {
  return (
    <div>
      <h1>Search</h1> <hr />
      <h2>Disc Search</h2>
      <div className="container p-4">
        <h4>Search Citeria</h4>
        <div className="form-group row mt-2">
          <label htmlFor="search-name" className="col-2 col-form-label">
            Name
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="search-name" placeholder="Name" />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-brand" className="col-2 col-form-label">
            Brand
          </label>
          <div className="col-sm-4">
            <input type="text" className="form-control" id="search-brand" placeholder="Brand" />
          </div>
        </div>
        <div className="form-group row mt-2">
          <label htmlFor="search-cat" className="col-2 col-form-label">
            Category
          </label>
          <div className="col-sm-4">
            <select className="form-select">
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
              <input type="Number" className="form-control" id="search-speed" placeholder="1 to 14" min={"1"} max={"14"} />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="search-glide" className="col-2 col-form-label">
              Glide
            </label>
            <div className="col-sm-4">
              <input type="Number" className="form-control" id="search-glide" placeholder="1 to 7" min={"1"} max={"7"} />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="search-turn" className="col-2 col-form-label">
              Turn
            </label>
            <div className="col-sm-4">
              <input type="Number" className="form-control" id="search-turn" placeholder="-5 to 1" min={"-5"} max={"1"} />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="search-fade" className="col-2 col-form-label">
              Fade
            </label>
            <div className="col-sm-4">
              <input type="Number" className="form-control" id="search-fade" placeholder="Fade" min={"0"} max={"5"} />
            </div>
          </div>
          <div className="form-group row mt-2">
            <label htmlFor="search-stability" className="col-2 col-form-label">
              Category
            </label>
            <div className="col-sm-4">
              <select className="form-select">
                <option value="">None</option>
                <option value="Understable">Understable</option>
                <option value="Stable">Stable</option>
                <option value="Overstable">Overstable</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary col-2 mt-4">Submit Search</button>
      </div>
    </div>
  );
}

export default Search;
