/*=================================
  STATELESS FUNCTIONAL COMPONENT
==================================*/

// Deps
import React from 'react';

// Sub-Components
import EmptyStateIcon from '../EmptyStateIcon/EmptyStateIcon';
import EmptyStateText from '../EmptyStateText/EmptyStateText';

// Styles
import styles from './EmptyStateCard.pcss';


const EmptyStateCard = () => {
  return (
    <div className={ styles.main__emptyStateCard }>
      <EmptyStateIcon />
      <EmptyStateText />
    </div>
  )
}

export default EmptyStateCard
