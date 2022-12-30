import React from 'react';
import { memo, useMemo } from 'react';
import { formatNumberWithCommas } from '../../../../utilities/formatter';
// import statusLabelConfigFunctions from '../CarTile/statusLabelConfigFunctions';
import Label from '../Label/Label';
import './FbsTerms.scss';

const FbsTerms = ({ fbsDecision, vehicleData }: any) => {
    const labelContent = useMemo(() => {
        // if (vehicleData.isDisabled) {
        //     const configFn = statusLabelConfigFunctions.default;
        //     return configFn({ fbsDecision });
        // } else {
        //     const configFn = statusLabelConfigFunctions[fbsDecision?.decision] || statusLabelConfigFunctions.default;
        //     return configFn({ fbsDecision, vehicleData });
        // }
    }, [fbsDecision]);

    const getTermLength = () => {
        return fbsDecision?.terms[0]?.length;
    };

    const getMinApr = () => {
        return fbsDecision?.terms[0]?.minTermRate.apr || 0;
    };

    const getMaxApr = () => {
        return fbsDecision?.terms[0]?.minTermRate.apr || 0;
    };

    const getMinPayment = () => {
        if (fbsDecision?.terms[0]) {
            return `$${formatNumberWithCommas(fbsDecision?.terms[0]?.minTermRate?.monthlyPayment || 0)}`;
        }
        return 0;
    };

    const getMaxPayment = () => {
        if (fbsDecision?.terms[0]) {
            return `$${formatNumberWithCommas(fbsDecision?.terms[0]?.maxTermRate?.monthlyPayment || 0)}`;
        }
        return 0;
    };

    return (
        <div className="sc--fbs-terms kmx-typography--body-3">
            {/* {labelContent.hasTerms ? (
                <>
                    {getMinPayment() === getMaxPayment()
                        ? `${getMinPayment()}/mo`
                        : `${getMinPayment()}-${getMaxPayment()}/mo`}
                    <div className="sc--fbs-terms--rate-term kmx-typography--fine-print">
                        {getMinApr() === getMaxApr() ? `${getMinApr()}% APR` : `${getMinApr()}%-${getMaxApr()}% APR`}
                        <span className="sc--fbs-terms--bullet">&#8226;</span>
                        {getTermLength()} month
                    </div>
                </>
            ) : null} */}
            {/* <Label
                content={labelContent}
                className={!labelContent?.hasTerms ? 'no-terms' : ''}
                fbsDecision={fbsDecision}
                vehicleData={vehicleData}
            /> */}
        </div>
    );
};

export default memo(FbsTerms);
