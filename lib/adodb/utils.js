/**
 * @module utils
 * @license MIT
 * @version 2017/11/09
 */

import './json';

/**
 * @function stdout
 * @param {any} data
 */
export function stdout(data) {
  WScript.StdOut.Write(encodeURI(JSON.stringify(data)));
}

/**
 * @function stderr
 * @param {any} data
 */
export function stderr(data) {
  WScript.StdErr.Write(encodeURI(JSON.stringify(data)));
}

/**
 * @function fillRecords
 * @param {Recordset} recordset
 * @returns {Array}
 */
export function fillRecords(recordset, required) {
  var records = [];
  var fields = recordset.Fields;

  // Not empty
  if (!recordset.BOF || !recordset.EOF) {
    var i;
    var record;
    var field, value;
    var fieldsCount = fields.Count;

    recordset.MoveFirst();

    while (!recordset.EOF) {
      record = {};

      for (i = 0; i < fieldsCount; i++) {
        field = fields.Item(i);
        value = field.Value;

        // ADO has given us a UTC date but JScript assumes it's a local timezone date
        // Thanks https://github.com/Antony74
        if (typeof value === 'date') {
          value = new Date(value);
        }

        record[field.Name] = value;
      }

      records.push(record);
      recordset.MoveNext();
    }
  }

  // Return records
  return records;
}
