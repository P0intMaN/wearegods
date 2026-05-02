import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ChevronLeft, ChevronRight, Menu, Home } from 'lucide-react';
import './ChapterReader.css';

const ChapterReader: React.FC = () => {
  const { phaseId, chapterId } = useParams<{ phaseId: string; chapterId: string }>();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [openPhases, setOpenPhases] = useState<Record<string, boolean>>({
    'prologue': true,
    'phase-1': true
  });
  const navigate = useNavigate();

  const togglePhase = (id: string) => {
    setOpenPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setLoading(true);
    // Fetch from the root of the public folder
    fetch(`./content/${phaseId}/${chapterId}.md`)
      .then(res => {
        if (!res.ok) throw new Error("Dataset not found");
        return res.text();
      })
      .then(text => {
        setContent(text);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch(err => {
        console.error("Failed to load chapter:", err);
        setContent("# Error 404\nChapter not found in the archives.");
        setLoading(false);
      });
  }, [phaseId, chapterId]);

  return (
    <div className="reader-page">
      <nav className="reader-nav ui-text">
        <Link to="/" className="nav-item"><Home size={18} /> <span>ORIGIN</span></Link>
        <div className="nav-center">
          <span className="current-location">{phaseId?.replace('-', ' ')} / {chapterId?.replace('-', ' ')}</span>
        </div>
        <button className="nav-item menu-toggle"><Menu size={18} /> <span>INDEX</span></button>
      </nav>

      <div className="reader-container">
        <aside className="reader-sidebar ui-text">
          <div className="sidebar-section">
            <h4 onClick={() => togglePhase('prologue')} className={`phase-toggle ${phaseId === 'prologue' ? 'active-phase' : ''}`}>
              {openPhases['prologue'] ? '▼' : '▶'} PROLOGUE
            </h4>
            {openPhases['prologue'] && (
              <ul>
                <li 
                  className={chapterId === 'prologue' ? 'active' : ''} 
                  onClick={() => navigate('/prologue/prologue')}
                >
                  Indifference
                </li>
              </ul>
            )}
          </div>
          <div className="sidebar-section">
            <h4 onClick={() => togglePhase('phase-1')} className={`phase-toggle ${phaseId === 'phase-1' ? 'active-phase' : ''}`}>
              {openPhases['phase-1'] ? '▼' : '▶'} PHASE I
            </h4>
            {openPhases['phase-1'] && (
              <ul>
                <li 
                  className={chapterId === 'chapter-1' ? 'active' : ''} 
                  onClick={() => navigate('/phase-1/chapter-1')}
                >
                  1. A Million Years, They Said
                </li>
                <li className="locked">2. Orbital Mechanics</li>
              </ul>
            )}
          </div>
        </aside>

        <main className={`markdown-body ${loading ? 'loading' : 'loaded'}`}>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: ({node, ...props}) => <h1 className="glitch-header" data-text={props.children} {...props} />,
              h2: ({node, ...props}) => <h2 className="tech-header" {...props} />,
              h3: ({node, ...props}) => <h3 className="ui-header" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="archive-quote" {...props} />,
              hr: () => <div className="scanner-line"></div>,
              em: ({node, ...props}) => <em className="emphasis-cyan" {...props} />,
              strong: ({node, ...props}) => <strong className="emphasis-purple" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
          
          <div className="chapter-navigation ui-text">
            {phaseId === 'phase-1' && (
              <button className="nav-btn prev" onClick={() => navigate('/prologue/prologue')}>
                <ChevronLeft size={20} /> PREVIOUS DATASET
              </button>
            )}
            {phaseId === 'prologue' && (
              <button className="nav-btn next" onClick={() => navigate('/phase-1/chapter-1')}>
                NEXT DATASET <ChevronRight size={20} />
              </button>
            )}
          </div>
        </main>
      </div>
      
      <div className="reading-progress-bar"></div>
    </div>
  );
};

export default ChapterReader;
