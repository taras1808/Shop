import { Slider, Collapse } from '@material-ui/core';
import React from 'react';
import './Filter.css';

export const FilterType = Object.freeze({
    SELECT: 0,
    SLIDER: 1
});
  

export class Filter extends React.Component {

    constructor(props) {
        super(props)
        this.state = { value: [0, 100], collapsed: false }
        
    }

    render() {



        switch (this.props.type) {
            case FilterType.SELECT:
                this.content = (
                    <ul>
                        {
                            this.props.items.map((item, index) => (
                                <li key={index}>
                                    <input type="checkbox" id={item.name} />
                                    <label htmlFor={item.name}>
                                        { item.name }
                                    </label>
                                </li>
                            ))
                        }
                    </ul>
                )
                break
            case FilterType.SLIDER:
                this.content = (
                    <>
                        <div className="slider-info">
                            <input type="text" value={this.state.value[0]} onChange={(e) => {
                                this.setState({ ...this.state, value: [e.target.value, this.state.value[1]] })
                            }} />

                            <input type="text" value={this.state.value[1]} onChange={(e) => {
                                this.setState({ ...this.state, value: [this.state.value[0], e.target.value] })
                            }} />

                            <button>OK</button>
                        </div>
                        <div className="slider-block">
                            <Slider
                                value={this.state.value}
                                onChange={(_, value) => {
                                    this.setState({ ...this.state, value: value })
                                }}
                                aria-labelledby="track-false-slider"
                            />
                        </div>
                    </>
                )
                break
            default:
                break
        }

        return (
            <div className="filter-block">

                <div className="filter-header" onClick={() => {
                     this.setState({ ...this.state, collapsed: !this.state.collapsed })
                }}>
                    <p>
                        { this.props.header }
                    </p>
                </div>

                <Collapse className="collapse" in={!this.state.collapsed}>
                    { this.content }
                </Collapse>

            </div>
        );
    }
}