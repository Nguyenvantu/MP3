import React from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import SearchMenu from "../SearchMenu";
import apiUrl from "../../settings";

class Search extends React.Component {
  constructor() {
    super();
    this.state = { term: "", searchResult: {}, loading: false };
    this.debounceSearch = debounce(this.search, 300);
  }

  search = term => {
    this.setState({ loading: true });
    axios
      .get(`${apiUrl}/media/search?term=${term}`)
      .then(({ data }) => {
        if (this.state.term.length) {
          this.setState({ searchResult: data, loading: false });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  };

  handleOnChange = e => {
    let term = e.target.value;
    if (!term) return this.setState({ term: "" });
    this.setState({ term });
    // term = term.replace(/\s+/g, "+");
    this.debounceSearch(term);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchResult.result && !this.state.term.length) {
      this.setState({ searchResult: {} });
    }
  }

  clearSearchResult = () => {
    this.setState({ term: "", searchResult: {} });
  };

  render() {
    const { t } = this.props;
    const { term, searchResult, loading } = this.state;

    return (
      <div className="searchBar">
        <div className="search-wrapper">
          <i className="ion-search" />
          <input
            type="text"
            placeholder={t("search") + "..."}
            value={term}
            onChange={this.handleOnChange}
          />
        </div>
        {searchResult.error_code === 0 && (
          // <Spin spinning={loading}>
          <SearchMenu
            loading={loading}
            searchResult={searchResult}
            clearSearchResult={this.clearSearchResult}
          />
          // </Spin>
        )}
      </div>
    );
  }
}
export default Search;
