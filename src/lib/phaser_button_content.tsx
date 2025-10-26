import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

type HighScore = {
  id: string | number;
  username: string;
  score: number;
};

type PhaserButtonContentProps = {
  scoreToDisplay: number;
  highScoresArray: HighScore[];
  startGameCallback: () => void;
  hideGameCallback: () => void;
  nameWriting: boolean;
};

export default function PhaserButtonContent({
  scoreToDisplay,
  highScoresArray,
  startGameCallback,
  hideGameCallback,
  nameWriting,
}: PhaserButtonContentProps) {
  const [showHighScoresTab, setShowHighScoresTab] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [localHighScores, setLocalHighScores] =
    useState<HighScore[]>(highScoresArray);
  const [localNameWriting, setLocalNameWriting] =
    useState<boolean>(nameWriting);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLocalHighScores(highScoresArray);
  }, [highScoresArray]);

  useEffect(() => {
    setLocalNameWriting(nameWriting);
  }, [nameWriting]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) return;
    setLocalNameWriting(false);
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(
        'https://personal-website-backend-production-c5a6.up.railway.app/api/scores/new',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, score: scoreToDisplay }),
        }
      );

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data: { scores: HighScore[] } = await res.json();
      setLocalHighScores(data.scores);
      setShowHighScoresTab(true);
    } catch (err) {
      console.error('Submit failed:', err);
      setError('Failed to submit score.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {showHighScoresTab ? (
        <div
          className="pbc_container"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10000,
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            color: 'white',
          }}
        >
          {localNameWriting ? (
            <div className="pbc_nw_container">
              <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                <input
                  autoFocus
                  placeholder="Enter your username..."
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ fontSize: '12px', padding: '4px' }}
                  disabled={submitting}
                />
                <button
                  type="submit"
                  style={{ fontSize: '12px' }}
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : 'Submit'}
                </button>
                {error && (
                  <p style={{ color: 'red', fontSize: '11px' }}>{error}</p>
                )}
              </form>
              <button
                onClick={() => setShowHighScoresTab(false)}
                style={{
                  fontSize: '14px',
                  marginRight: '0px',
                  marginTop: '5px',
                }}
              >
                Back
              </button>
            </div>
          ) : (
            <div className="pbc_hs_container">
              <p style={{ fontSize: '11px' }}>Top 5 scores:</p>
              <ul
                style={{
                  listStyleType: 'none',
                  padding: 0,
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {localHighScores.map(({ id, score, username }) => (
                  <li
                    key={id}
                    style={{
                      display: 'inline-block',
                      margin: '0 10px',
                      fontSize: '11px',
                    }}
                  >
                    {score} by {username}
                  </li>
                ))}
              </ul>
              <button
                className="start_game_button no_margin_button"
                onClick={() => setShowHighScoresTab(false)}
                style={{
                  fontSize: '11px',
                  marginRight: '0px',
                  marginTop: '5px',
                }}
              >
                Back
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={startGameCallback}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10000,
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            {scoreToDisplay >= 0 ? (
              <div style={{ color: 'white' }}>
                Your score = {scoreToDisplay}. Restart
              </div>
            ) : (
              'Start Game'
            )}
          </button>
          <div
            style={{
              position: 'absolute',
              top: '73%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'row',
              gap: '30px',
              color: 'white',
            }}
          >
            <button onClick={hideGameCallback} style={{ cursor: 'pointer' }}>
              Hide game
            </button>
            <button
              onClick={() => setShowHighScoresTab(true)}
              style={{ cursor: 'pointer', color: 'white' }}
            >
              Top 5 ever
              {localNameWriting && (
                <p className="small_yellow_text">Add your score!</p>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
