import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DeliveryAddress from './DeliveryAddress';
import OrderSummary from './OrderSummary';

const QontoStepIconRoot = styled('div')(({ theme }) => ({
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    ...theme.applyStyles('dark', {
        color: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                color: '#784af4',
            },
        },
    ],
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
        ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.grey[800],
        }),
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[700],
    }),
    variants: [
        {
            props: ({ ownerState }) => ownerState.active,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
                boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
            },
        },
        {
            props: ({ ownerState }) => ownerState.completed,
            style: {
                backgroundImage:
                    'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            },
        },
    ],
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <HowToRegIcon />,
        2: <LocalShippingIcon />,
        3: <VideoLabelIcon />,
        4: <PaymentsIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Login', 'Delivery Address', 'Order Summary', 'Payment'];

export default function CheckOut() {
    const location = useLocation();
    const navigate = useNavigate(); 
    const querySearch = new URLSearchParams(location.search);

    const stepFromURL = parseInt(querySearch.get("step")) || 0; 
    const [activeStep, setActiveStep] = React.useState(stepFromURL); 

    
    const updateStepInURL = (step) => {
        querySearch.set("step", step);
        navigate(`${location.pathname}?${querySearch.toString()}`);
    };

    const handleNext = () => {
        const nextStep = Math.min(activeStep + 1, steps.length - 1);
        setActiveStep(nextStep);
        updateStepInURL(nextStep); // Update URL param
    };

    const handleBack = () => {
        const prevStep = Math.max(activeStep - 1, 0);
        setActiveStep(prevStep);
        updateStepInURL(prevStep); // Update URL param
    };

    React.useEffect(() => {
        setActiveStep(stepFromURL); // Sync state when the URL changes
    }, [stepFromURL]);

    return (
        <div className='mb-10 mt-10'>
            <Stack sx={{ width: '100%' }} spacing={4}>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div className="mt-10">
                    {activeStep === 1 && <DeliveryAddress />}
                    {activeStep === 2 && <OrderSummary />}
                </div>

            </Stack>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button
                    sx={{ marginLeft: '5rem' }}
                    disabled={activeStep === 1}
                    onClick={handleBack}
                    variant="contained"
                    color="primary"
                >
                    Prev
                </Button>

                {/* <Button
                    sx={{ marginRight: '4rem' }}
                    disabled={activeStep === steps.length - 1}
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                >
                    Next
                </Button> */}
            </div>
        </div>
    );
}
