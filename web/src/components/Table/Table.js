import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid'
import { Link } from '@redwoodjs/router'

export const COLUMN_TYPE = {
  TEXT: 'TEXT',
  DATE: 'DATE',
  CHECKBOX: 'CHECKBOX',
  JSON: 'JSON',
}

const Table = ({
  //Columns should be an array of objects, with the name, key, and type
  columns = [],
  onSort = () => {},
  sort = {},
  //Actions should be an array of objects with a text, action, and type, an optional colour, and optionally a link
  actions = [],
  //Object to search through
  dataObj = [],
}) => {
  const MAX_STRING_LENGTH = 150

  const truncate = (text) => {
    let output = text
    if (text && text.length > MAX_STRING_LENGTH) {
      output = output.substring(0, MAX_STRING_LENGTH) + '...'
    }
    return output
  }

  const jsonTruncate = (obj) => {
    return truncate(JSON.stringify(obj, null, 2))
  }

  const timeTag = (datetime) => {
    return (
      <time dateTime={datetime} title={datetime}>
        {datetime ? new Date(datetime).toUTCString() : ''}
      </time>
    )
  }

  const checkboxInputTag = (checked) => {
    return <input type="checkbox" checked={checked} disabled />
  }

  const renderTypeContent = (content, type) => {
    switch (type) {
      case COLUMN_TYPE.TEXT:
        return truncate(content)
      case COLUMN_TYPE.DATE:
        return timeTag(content)
      case COLUMN_TYPE.JSON:
        return jsonTruncate(content)
      case COLUMN_TYPE.CHECKBOX:
        return checkboxInputTag(content)
      default:
        return content
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            {columns.map(({ name, isSortable, key }) =>
              isSortable !== undefined && !isSortable ? (
                <th key={name}>{name}</th>
              ) : (
                <th key={name}>
                  <div
                    className="cursor-pointer hover:bg-gray-300 flex items-center"
                    onClick={() =>
                      onSort({
                        orderByKey: key,
                        orderByDirection:
                          sort.orderByKey === key &&
                          sort.orderByDirection === 'desc'
                            ? 'asc'
                            : 'desc',
                      })
                    }
                  >
                    {name}
                    {sort.orderByKey === key ? (
                      sort.orderByDirection === 'desc' ? (
                        <ArrowDownIcon className="ml-2 h-3 w-3 red-500" />
                      ) : (
                        <ArrowUpIcon className="ml-2 h-3 w-3 red-500" />
                      )
                    ) : null}
                  </div>
                </th>
              )
            )}

            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {dataObj.map((item) => (
            <tr key={item.id}>
              {columns.map(({ key, type }) => (
                <td key={key}>{renderTypeContent(item[key], type)}</td>
              ))}
              <td>
                <nav className="rw-table-actions">
                  {actions.map(({ text, action, colour = 'blue' }) => (
                    <button
                      key={`action-${text}-${item.id}`}
                      onClick={() => action(item.id)}
                      className={`rw-button rw-button-small rw-button-${colour}`}
                    >
                      {text}
                    </button>
                  ))}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
