export function isStatus(
  statusCategory: (
    | '1xx'
    | '2xx'
    | '3xx'
    | '4xx'
    | '5xx'
  ),
  status: number,
): boolean {
  let boundaryA =
    statusCategory == '1xx' ? 100 :
    statusCategory == '2xx' ? 200 :
    statusCategory == '3xx' ? 300 :
    statusCategory == '4xx' ? 400 :
    statusCategory == '5xx' ? 500 :
    999
  let boundaryB = boundaryA + 100
  
  return (
    status >= boundaryA &&
    status < boundaryB
  )
}
