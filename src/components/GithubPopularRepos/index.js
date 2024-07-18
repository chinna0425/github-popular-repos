import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFiltersItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const repoItemsConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    status: 'ALL',
    reposList: [],
    repoStatus: repoItemsConstants.loading,
    issuccess: false,
    isfail: false,
    isloading: true,
  }

  componentDidMount() {
    this.getTheRepos()
  }

  onChangeRepoStatus = id => {
    this.setState(
      {status: id, isloading: true, issuccess: false, isfail: false},
      this.getTheRepos,
    )
  }

  getTheRepos = async () => {
    const {status} = this.state
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${status}`,
    )
    const data = await response.json()
    if (response.ok === true) {
      const updated = {popularRepos: data.popular_repos}
      const latest = updated.popularRepos.map(each => ({
        name: each.name,
        id: each.id,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        starsCount: each.stars_count,
      }))
      this.setState({reposList: latest, isloading: false, issuccess: true})
    } else if (response.ok === false) {
      this.setState({isloading: false, issuccess: false, isfail: true})
    }
  }

  /* onChnageSuccess = () => (
    
  ) */

  render() {
    const {
      reposList,
      status,
      repoStatus,
      issuccess,
      isfail,
      isloading,
    } = this.state
    return (
      <div className="github-popularrepos-container">
        <h1 className="github-repos-heading">Popular</h1>
        <div className="unorder-list-items">
          {languageFiltersData.map(eachItem => (
            <LanguageFiltersItem
              eachItem={eachItem}
              key={eachItem.id}
              isActive={status === eachItem.id}
              onChangeRepoStatus={this.onChangeRepoStatus}
            />
          ))}
        </div>
        {isloading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : null}
        {issuccess ? (
          <ul className="unorder-list-container-items">
            {reposList.map(eachRepo => (
              <RepositoryItem eachRepo={eachRepo} key={eachRepo.id} />
            ))}
          </ul>
        ) : null}
        {isfail ? (
          <div className="failure-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
              className="failure-image"
            />
          </div>
        ) : null}
      </div>
    )
  }
}
export default GithubPopularRepos
