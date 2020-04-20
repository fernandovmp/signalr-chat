import React from 'react';
import { useHistory } from 'react-router-dom';
import { getExploreHeaderStyles } from './styles';
import { getCommonStyles } from '../../../styles/commonStyles';

export const ExploreHeader: React.FC = () => {
    const history = useHistory();
    const { transparentButton } = getCommonStyles();
    const { exploreHeader, headerButton } = getExploreHeaderStyles();

    const handleCreateButtonClick = () => {
        history.push('/create-channel');
    };

    return (
        <header className={exploreHeader}>
            <button
                className={[headerButton, transparentButton].join(' ')}
                onClick={handleCreateButtonClick}
            >
                <svg version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path
                        fill="#ffffff"
                        d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                    />
                </svg>
                Create channel
            </button>
        </header>
    );
};
