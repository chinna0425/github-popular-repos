import './index.css'

const RepositoryItem = props => {
  const {eachRepo} = props
  const {name, starsCount, id, forksCount, issuesCount, avatarUrl} = eachRepo
  return (
    <li className="repositoryitem-list">
      <img src={avatarUrl} alt={name} className="repo-avatar" />
      <h1 className="repoitem-heading">{name}</h1>
      <div className="repo-inner-contianer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="repo-item-logo"
        />
        <p className="repo-list-paragraph">{starsCount}</p>
      </div>
      <div className="repo-inner-contianer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repo-item-logo"
        />
        <p className="repo-list-paragraph">{forksCount}</p>
      </div>
      <div className="repo-inner-contianer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open error"
          className="repo-item-logo"
        />
        <p className="repo-list-paragraph">{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
