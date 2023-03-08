import { Avatar } from './Avatar';
import { Comment } from './Comment'

import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import styles from './Post.module.css';
import { useState } from 'react';

export function Post({author, publishedAt, content}) {

  const [comments, setComments]= useState(['LEGAL!!!']);
  const [newCommentText, setNewCommentText]= useState('');

  function handleCreateNewComment() {
    event.preventDefault();

    if(newCommentText) setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentText() {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment != commentToDelete;
    });

    setComments(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Escreva algo antes!');
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  // const publishedDateFormated = new Intl.DateTimeFormat('pt-BR', {
  //   day: '2-digit',
  //   month: 'long',
  //   hour: '2-digit',
  //   minute:'2-digit'
  // }).format(publishedAt);

  const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'",{
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  const publishedDateISOString = publishedAt.toISOString();

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl}/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={publishedDateISOString}>
        {publishedDateRelativeToNow}
      </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if(line.type == 'paragraph') {
            return (<p key={line.content}>{line.content}</p>);
          } else if (line.type == 'link') {
            return (<p key={line.content}><a href='#'>{line.content}</a></p>);
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea 
          name='comment' 
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return(
            <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  )
}