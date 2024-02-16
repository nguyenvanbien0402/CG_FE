const HttpHelper = {
  configHeaderApi: (data) => {
    let headers = {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      // 'Authorization': window.$cookies.isKey('Authorization') ? window.$cookies.get('Authorization') : '',
    };
    if (typeof(data) === 'number' || typeof(data) === 'string') {
      headers["Content-Type"] = "application/json";
    }
    return headers;
  }
}

const ArrayHelper = {
  remove: (arr, el, key) => {
    let index = arr.findIndex(item => item[key] === el[key]);
    if (index > -1) {
      arr.splice(index, 1);
    }
  },
  removeByKey: (arr, field, value) => {
    let index = arr.findIndex(item => item[field] === value);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }
}

const SourceHelper = {
  javascript: (source) => {
    return '```js' + source + '```'
  },
  html: (source) => {
    return '```' + source + '```'
  }
}

const DataTableHelper = {
  optionBuilder: (sortBy = [], sortDesc = []) => {
    return {
      page: 1,
      itemsPerPage: 20,
      sortBy: sortBy,
      sortDesc: sortDesc,
      groupBy: [],
      groupDesc: [],
      mustSort: null,
      multiSort: null
    }
  },
  buildRequest: (
    options = { itemsPerPage: null, page: null, sortBy: null, sortDesc: null },
    searchModel = {},
    searchExtend = {}
  ) => {
    let request = {
      size: options.itemsPerPage,
      page: options.page,
      sortBy: options.sortBy.length ? options.sortBy[0] : null,
      sortDesc: options.sortDesc.length ? options.sortDesc[0] : null,
      ...searchModel,
      ...searchExtend
    };
    for (const  prop in request) {
      if (request[prop] === '') {
        request[prop] = null
      }
    }
    return request
  }
};

const CommonFormatDate = 'yyyy/MM/dd';

const DownloadTemplate = (path, fileName) => {
  let url = import.meta.env.VITE_BASE_URL + path + fileName
  let elDownload = document.createElement('a')
  elDownload.id = 'idTemplateDownload'
  document.body.appendChild(elDownload)
  elDownload.setAttribute('href', url)
  elDownload.setAttribute('download', fileName)
  elDownload.style.display = 'none'
  elDownload.click()
  document.body.removeChild(elDownload)
}

export {
  DownloadTemplate,
  DataTableHelper,
  ArrayHelper,
  HttpHelper,
  SourceHelper,
  CommonFormatDate
}
