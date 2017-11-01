/**
 * Copyright © 2013-2017 Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
import {DataObject} from "../component/data-store";

export default class StyleAttributeMapper {
    /**
     * Map style attribute keys to DOM key names and normalize values
     *
     * @param {DataObject} data
     * @returns {DataObject}
     */
    toDom(data: DataObject): DataObject {
        let result: DataObject = {};
        Object.keys(data).map(
            function (key: string) {
                let value = data[key];
                if (!value) {
                    return;
                }
                if (key === 'min_height') {
                    value = value.replace('px', '') + 'px';
                }
                if (key === 'background_repeat') {
                    value = value ? 'repeat' : 'no-repeat';
                }
                result[this.fromSnakeToCamelCase(key)] = value;
            }.bind(this)
        );
        return result;
    }

    /**
     * Map DOM key names and values to internal format
     *
     * @param {DataObject} data
     * @returns {DataObject}
     */
    public fromDom(object) {
        let result = {};
        Object.keys(object).map(
            function (key: any) {
                let value = object[key];
                if (key === 'min-height') {
                    value = value.replace('px', '');
                }
                if (key === 'background-repeat') {
                    value = value === 'repeat' ? '1' : '0';
                }
                if (key === 'background-color') {
                    const regexp = /(\d{0,3}),\s(\d{0,3}),\s(\d{0,3})/
                    let matches = regexp.exec(value)
                    value = '#'
                        + this.fromIntToHex(parseInt(matches[1]))
                        + this.fromIntToHex(parseInt(matches[2]))
                        + this.fromIntToHex(parseInt(matches[1]));
                }
                result[key.replace('-', '_')] = value;
            }.bind(this)
        );
        return result;
    }

    /**
     * Convert from snake case to camel case
     *
     * @param string
     * @returns {string}
     */
    private fromSnakeToCamelCase(string: string): string {
        let parts: Array<string> = string.split(/[_-]/);
        let newString: string = '';
        for (let i = 1; i < parts.length; i++) {
            newString += parts[i].charAt(0).toUpperCase() + parts[i].slice(1);
        }
        return parts[0] + newString;
    }

    /**
     * Convert from int to hex
     *
     * @param value
     * @returns {string}
     */
    private fromIntToHex(value): string {
        let hex = value.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    }
}
