import { useState } from 'react';

import { Avatar } from './Avatar';

import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';

export function Comment({content, onDeleteComment}) {

  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount(likeCount + 1);
  }

  return (
    <div className={styles.comment}>
     <Avatar hasBorder={false} src="https://github.com/alanjuniorn8.png"/>
        
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Alan Spínola</strong>
              <time title='07 de março às 13h30m' dateTime='2023-07-03 13:30:00'>
                Cerca de 1h atrás
              </time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24}/>
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button title='Aplaudir comentário' onClick={handleLikeComment}>
              <ThumbsUp size={20}/>
              Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}