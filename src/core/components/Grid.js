import React from 'react';
import './Grid.css';
import Cell from './Cell';


export default class Grid extends React.Component {

    cellStatus = {
        ALIVE: true,
        DEAD: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            grid: this.init(),
            iterations: 0
        };
    }

    componentDidMount() {
        setInterval(() => this.parse(), this.props.pace);
    }

    init() {
        let grid = [],
            field = 0,
            row = 0;

        for (field = 0; field < this.props.gridSize.fields; field++) {
            grid[field] = [];
            for (row = 0; row < this.props.gridSize.rows; row++) {
                grid[field][row] = this.cellStatus.DEAD;
            }
        }

        return grid;
    }

    parse() {
        if (this.props.isGameRunning) {
            const updatedGrid = [];
            let field = 0,
                row = 0,
                gridChanged = 0;

            for (field = 0; field < this.props.gridSize.fields; field++) {
                updatedGrid[field] = [];
                for (row = 0; row < this.props.gridSize.rows; row++) {
                    updatedGrid[field][row] = this.getCellState(field, row);
                    if (
                        (!gridChanged)
                        && (updatedGrid[field][row] !== this.state.grid[field][row])
                    ) {
                        gridChanged = 1;
                    }
                }
            }

            if (gridChanged) {
                this.setState({
                    ...this.state,
                    grid: updatedGrid,
                    iterations: this.state.iterations + 1
                })
            }
        }
    }

    getCellState(field, row) {
        const alivesCount = this.getAlivesCount(field, row);
        const currentState = this.state.grid[field][row];

        if (
            currentState === this.cellStatus.DEAD
            && alivesCount === 3
        ) {
            return this.cellStatus.ALIVE;
        }

        if (currentState === this.cellStatus.ALIVE) {
            if (alivesCount < 2) {
                return this.cellStatus.DEAD;
            } else if (alivesCount === 2 || alivesCount === 3) {
                return this.cellStatus.ALIVE;
            } else if (alivesCount > 3) {
                return this.cellStatus.DEAD;
            }
        }

        return this.cellStatus.DEAD;
    }

    getAlivesCount(field, row) {
        let count = 0;

        /*
            +-----+-----+-----+
            |-1; 1| 0; 1| 1; 1|
            +-----+-----+-----+
            |-1; 0|     | 1; 0|
            +-----+-----+-----+
            |-1;-1| 0;-1| 1;-1|
            +-----+-----+-----+
        */
        const shifts = [
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
        ];

        for (const shift of shifts) {
            const [x, y] = shift;

            let locationX = field + x;
            let locationY = row + y;

            if (this.__isLocationOutsideGrid(locationX, locationY)) {
                continue;
            }

            if (
                this.state.grid[locationX][locationY] === this.cellStatus.ALIVE
            ) {
                count++;
            }
        }

        return count;
    }

    __isLocationOutsideGrid(locationX, locationY) {
        if (
            (locationX < 0 || locationX > this.props.gridSize.fields - 1)
            || (locationY < 0 || locationY > this.props.gridSize.rows - 1)
        ) {
            return true;;
        }

        return false;
    }

    toggleCellState = (e) => {
        const field = e.target.getAttribute('data-field');
        const row = e.target.getAttribute('data-row');
        const updatedGrid = this.state.grid;

        updatedGrid[field][row] = !updatedGrid[field][row];

        this.setState({
            ...this.state,
            grid: updatedGrid
        })
    }

    selfRender() {
        return (
            <div className="grid" onClick={(e) => this.toggleCellState(e)}>
                {this.state.grid.map((rows, field) => {
                    return this.getFieldRendered(rows, field)
                })}
            </div>
        );
    }

    getFieldRendered(rows, field) {
        return (
            <div className="field" key={`field_${field}`}>
                {rows.map((cellStatus, row) => {
                    return (
                        <Cell
                            status={cellStatus}
                            field={field}
                            row={row}
                        />
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <>
                <div>Survived generations: {this.state.iterations}</div>
                {this.selfRender()}
            </>
        );
    };
}
