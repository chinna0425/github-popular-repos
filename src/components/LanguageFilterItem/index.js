import './index.css'

const LanguageFiltersItem = props => {
  const {eachItem, onChangeRepoStatus, isActive} = props
  const {id, language} = eachItem
  const changeRepo = () => {
    onChangeRepoStatus(id)
  }
  const addcolor = isActive ? 'button-style1' : 'button-style'
  return (
    <button type="button" className={addcolor} onClick={changeRepo}>
      {language}
    </button>
  )
}
export default LanguageFiltersItem
