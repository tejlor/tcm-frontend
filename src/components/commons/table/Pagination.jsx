import * as React from "react";

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

  componentDidUpdate(prevProps) {
    if (this.props.page !== prevProps.page) {
      this.setState({
        page: this.props.page
      });
    }
  }

  calcVisiblePages(current, total) {
    let left = current - Pagination.DELTA;
    let right = current + Pagination.DELTA + 1;
    let range = [];
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= left && i < right)) {
        range.push(i);
      }
    }

    let last = undefined;
    let rangeWithDots = [];
    for (let i of range) {
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

    if (this.props.page !== page) {
      this.props.onPageChange(page);
    }
  }

  render() {
    let { page, pages, rowStart, rowEnd, rowCount, canPrevious, canNext, previousText, nextText} = this.props;
    let visiblePages = this.calcVisiblePages(page + 1, pages);

    return (
      <div className="w3-row">
        <div className="w3-half">
          <p>{rowStart} - {rowEnd} of {rowCount}</p>          
        </div>
        <div className="w3-half w3-right-align">
          <div className="w3-show-inline-block">
            <div className="w3-bar w3-border w3-round">
              <button key="prev" className="w3-button" onClick={this.goPrev} disabled={!canPrevious}>
                {previousText}
              </button>
              {visiblePages.map((el, index) => {
                if (el == null) {
                  return <span key={index}>...</span>;
                }
                else { 
                  return (
                    <button key={index} className={page + 1 === el ? "w3-button w3-theme" : "w3-button"} onClick={() => this.onPageChange(el - 1)}>
                      {el}
                    </button>
                  );
                }
              })}
              <button key="next" className="w3-button" onClick={this.goNext} disabled={!canNext}>
                {nextText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
