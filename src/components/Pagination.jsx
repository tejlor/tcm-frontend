import * as React from "react";
import Select from "react-select-v1";

export default class Pagination extends React.Component {
  static DELTA = 2;

  constructor(props) {
    super(props);

    this.state = {
      page: props.page
    };

    this.goPrev = this.goPrev.bind(this);
    this.goNext = this.goNext.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page !== nextProps.page) {
      this.setState({
        page: nextProps.page
      });
    }
  }

  calcVisiblePages(current, total) {
    var left = current - Pagination.DELTA;
    var right = current + Pagination.DELTA + 1;
    var range = [];

    for (var i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= left && i < right)) {
        range.push(i);
      }
    }

    var last;
    var rangeWithDots = [];
    for (i of range) {
      if (last) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        }
        else if (i - last !== 1) {
          rangeWithDots.push(null);
        }
      }
      rangeWithDots.push(i);
      last = i;
    }
    return rangeWithDots;
  }

  goPrev() {
    if (!this.props.canPrevious)
      return;

    this.onPageChange(this.props.page - 1);
  }

  goNext() {
    if (!this.props.canNext)
      return;

    this.onPageChange(this.props.page + 1);
  }

  onPageChange(page) {
    this.setState({
      ...this.state,
      page: page
    });

    if (this.props.page !== page)
      this.props.onPageChange(page);
  }

  render() {
    var visiblePages = this.calcVisiblePages(this.props.page + 1, this.props.pages);
    var pageSizeOptions = this.props.pageSizeOptions.map((option) => {
      return {
        label: option,
        value: option
      };
    });

    return (
      <div className="w3-row">
        <div className="w3-half w3-margin-vert m-center">
          {this.props.showPageSizeOptions === true
            ? (
            <div>
              <label className="inline">Pokaż</label>
              <Select
                className="select-inline"
                serchable={false}
                clearable={false}
                onChange={(e) => this.props.onPageSizeChange(Number(e.value))}
                value={this.props.pageSize}
                options={pageSizeOptions}
              />
              <label>wierszy</label>
            </div>
            )
            : (
            "\u00A0"
          )}
        </div>
        <div className="w3-half w3-right-align w3-margin-vert m-center">
          <div className="w3-show-inline-block">
            <div className="w3-bar w3-border w3-round">
              <button key="prev" className="w3-button" onClick={this.goPrev} disabled={!this.props.canPrevious}>
                {this.props.previousText}
              </button>
              {visiblePages.map((el, index) => {
                if (el == null)
                  return <span key={index}>...</span>;
                else
                  return (
                    <button key={index} className={this.props.page + 1 === el ? "w3-button w3-green" : "w3-button"} onClick={() => this.onPageChange(el - 1)}>
                      {el}
                    </button>
                  );
              })}
              <button key="next" className="w3-button" onClick={this.goNext} disabled={!this.props.canNext}>
                {this.props.nextText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}
