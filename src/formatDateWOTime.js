export default function formatDateWOTime (date) {
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear()
}
