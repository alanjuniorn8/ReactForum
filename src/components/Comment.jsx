import { Avatar } from './Avatar';

import { ThumbsUp, Trash } from 'phosphor-react';
import styles from './Comment.module.css';

export function Comment() {
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

            <button title='Deletar comentário'>
              <Trash size={24}/>
            </button>
          </header>

          <p>Muito bom, parabéns!!</p>
        </div>

        <footer>
          <button title='Aplaudir comentário'>
              <ThumbsUp size={20}/>
              Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}