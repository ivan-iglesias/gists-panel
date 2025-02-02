import { useState, useEffect } from 'react'
import './App.css'

const GISTS_ENDPOINT = 'https://api.github.com/users';

interface GitHubGist {
  id: string;
  created_at: string;
  description: string;
  html_url: string;
}

function App() {
  const [gists, setGists] = useState<GitHubGist[] | null>(null);

  function remoteGistToGist(gist: GitHubGist): GitHubGist {
    return {
      id: gist.id,
      created_at: gist.created_at,
      description: gist.description,
      html_url: gist.html_url
    }
  }

  useEffect(() => {
    fetch(`${GISTS_ENDPOINT}/ivan-iglesias/gists`)
      .then(response => {
        if (!response.ok) {
          throw new Error('error fetching gists');
        }
        return response.json();
      })
      .then(data => {
        setGists(data.map((gist: GitHubGist) => remoteGistToGist(gist)))
       })
      .catch((err) => {
        setGists([])
        console.log(err);
      })
  }, [])

  return (
    <>
      <div>
        {gists && gists.length > 0 && gists.map((gist) => (
          <div key={gist.id} className="card">
            <p>{ gist.description || 'NA' }</p>
            <div className="card__created_at">{gist.created_at}</div>
          </div>
        ))}
       </div>
    </>
  )
}

export default App
