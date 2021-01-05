const getTargetUrl = ({data}: any): string => {
  const [url] = typeof data === 'string' ? data.split('?') : ['']
  return url
}


const mapController = (url: string, controller: Function) => async (request: any) => {
  if (request) {
    const targetUrl: string = getTargetUrl(request)
    if (url === targetUrl) {
      await controller(request)
    }
    return request
  }
  return request
}


export {mapController}
