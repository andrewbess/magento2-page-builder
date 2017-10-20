import Structural from './abstract';
import { ColumnInterface } from './column.d';
import { RowInterface } from "./row.d";
import { Column, ColumnData } from "./column";
import { Option } from "./options/option";
import { OptionInterface } from "./options/option.d";
import EditableArea from '../../stage/structural/editable-area'
import Stage from '../../stage';
import "ko-resizable";

/**
 * Row class
 *
 * @author Dave Macaulay <dmacaulay@magento.com>
 */
export default class Row extends Structural implements RowInterface {
    template: string = 'Gene_BlueFoot/component/stage/structural/row.html';

    /**
     * Abstract structural constructor
     *
     * @param parent
     * @param stage
     */
    constructor(parent: EditableArea, stage: Stage) {
        super(parent, stage);
        
        this.options.push(
            new Option(this, 'column', '<i></i>', 'Add Column', this.addColumn.bind(this), ['add-column'], 10)
        );
        this.config.role = 'row';
    }

    /**
     * Add a column to the row
     *
     * @param data
     * @returns {any}
     */
    addColumn(data?: ColumnData): ColumnInterface {
        let column = new Column(this, this.stage);
        column = this.onBlockDropped()
        this.addChild(column);
        column.updateColumnData(data);
        return column;
    }

    /**
     * Get template master format template
     *
     * @returns {string}
     */
    getPreviewTemplate(): string {
        return 'Gene_BlueFoot/component/stage/structural/render/row.html';
    }
}