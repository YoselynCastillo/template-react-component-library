import React from 'react';
import { memo, useCallback } from 'react';
// import { useModals } from '../../../hooks/useModals';
// import classnames from 'classnames';
// import FbsTermsModal from '../FbsTermsModal/FbsTermsModal';
// import InfoIcon from '../../InfoButton/InfoIcon';
import './Label.scss';

const Label = ({ content: { text, type }, className, fbsDecision, vehicleData, ...props }: any) => {
    // const { openModal } = useModals();

    // const handleModal = useCallback(
    //     (e) => {
    //         e.preventDefault();
    //         openModal(<FbsTermsModal fbsDecision={fbsDecision} vehicleData={vehicleData} />);
    //     },
    //     [openModal]
    // );

    return ( <></>
        // <button
        //     className={classnames('sc--label', `sc--label--${type}`, className)}
        //     {...props}
        //     onClick={handleModal}
        //     tabIndex={'0'}
        // >
        //     {text}
        //     <div className="sc--label--icon">
        //         <InfoIcon />
        //     </div>
        // </button>
    );
};
export default memo(Label);
