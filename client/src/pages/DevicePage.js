import React, { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import bigStar from '../assets/bigStar.png';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import { createRating, fetchOneDevice } from '../http/deviceAPI';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { createBasketDevice } from '../http/basketAPI';
import ToastContainer from 'react-bootstrap/ToastContainer';
import RatingDisplay from '../components/RatingDisplay';
import { createDeviceComment, fetchDeviceComments } from '../http/commentsAPI';
import CommentItem from '../components/CommentItem';
import Form from 'react-bootstrap/Form';
import classes from '../styles/DevicePage.module.css';
import GeneralModal from '../components/modals/GeneralModal';

const DevicePage = observer(() => {
  const [device, setDevice] = useState({ info: [] });
  const { user } = useContext(Context);
  const { id } = useParams();
  const [rate, setRate] = useState(-1);
  const rating = [1, 2, 3, 4, 5];
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentComment, setCurrentComment] = useState('');
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [basketModal, setBasketModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [commentsModal, setCommentsModal] = useState(false);

  const rateDevice = rate => {
    if (!user.user.id) {
      setRatingModal(true);
    } else {
      setRate(rate);
      createRating(Number(user.user.id), Number(id), Number(rate)).then(
        data => {
          setDevice({ ...device, rating: data.averageRate });
        }
      );
    }
  };

  const addToBasket = (deviceId, basketId) => {
    if (!user.user.id) {
      setBasketModal(true);
    } else {
      createBasketDevice(deviceId, basketId);
      setShow(true);
    }
  };

  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data));
    fetchDeviceComments(id).then(data => setComments(data));
  }, []);

  let text;
  const getText = arr => {
    arr.forEach(i => {
      if (i.title === 'Description') {
        text = i.description;
      }
    });
  };

  const addComment = async () => {
    if (!user.user.id) {
      setCommentsModal(true);
    }
    try {
      await createDeviceComment(
        Number(user.user.id),
        Number(id),
        currentComment
      );
      fetchDeviceComments(id).then(data => setComments(data));
      setCurrentComment(''); // Clear input field
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  getText(device.info);

  return (
    <Container className="mb-5">
      <title>{`${device.name} for only ${device.price}$`}</title>
      {/* MAIN CARD */}

      <Card className={classes.main}>
        <Image
          className={classes.mainImg}
          src={process.env.REACT_APP_API_URL + device.img}
        />
        <div className={classes.cardContent}>
          <div className={classes.headLine}>
            <div className={classes.nameAndPrice}>
              <div>
                <strong>{device.name}</strong>{' '}
              </div>
              <div className={classes.price}>
                <strong>{device.price}$</strong>
              </div>
            </div>
            <div className={classes.rating}>
              <RatingDisplay rating={device.rating} size={24} />{' '}
              <span> ({Number(device.rating).toFixed(2)})</span>
            </div>
          </div>

          <div className={classes.description}>
            <p>{text}</p>
          </div>
          <div className={classes.characteristics2}>
            {device.info
              .filter(info => info.title !== 'Description')
              .map(info => (
                <div key={info.id} className={classes.characteristicsLine2}>
                  <strong>{info.title}:</strong> {info.description}
                </div>
              ))}
          </div>
          <div className={classes.buttons}>
            <Button
              variant={'dark'}
              onClick={() => {
                addToBasket(id, user.user.id);
              }}
            >
              Add to basket
            </Button>
            {rate > -1 ? (
              <strong>Thanks!</strong>
            ) : (
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="dark">
                    {'Rate device'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {rating.map(rate => (
                      <Dropdown.Item
                        onClick={() => {
                          rateDevice(rate);
                        }}
                        key={rate}
                      >
                        {rate}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
        <div className={classes.characteristics}>
          {device.info
            .filter(info => info.title !== 'Description')
            .map(info => (
              <div key={info.id} className={classes.characteristicsLine}>
                <strong>{info.title}:</strong> {info.description}
              </div>
            ))}
        </div>
      </Card>
      <div className={classes.commSection}>
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              name={comment.user.email}
              isoDate={comment.createdAt}
              comment={comment.comment}
            />
          ))
        ) : (
          <div className={classes.noComm}>No comments yet!</div>
        )}
        <Form
          className="mt-2"
          onKeyDown={e => {
            if (e.key === 'Enter' && e.shiftKey) {
              setCurrentComment(currentComment + '\n');
              e.preventDefault();
            } else if (e.key === 'Enter') {
              addComment();
              e.preventDefault();
            }
          }}
        >
          {' '}
          <Form.Control
            style={{ border: 'solid #212529 1px', boxShadow: 'none' }}
            value={currentComment}
            onChange={e => setCurrentComment(e.target.value)}
            as="textarea"
            rows={3}
            placeholder={'Type your comment...'}
          />
        </Form>
      </div>

      {/* TOAST */}

      <ToastContainer
        className="p-3"
        position={'bottom-end'}
        style={{
          zIndex: 1,
          position: 'fixed',
        }}
      >
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={10000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body
            style={{ display: 'flex', gap: 10, alignItems: 'center' }}
          >
            <Image
              width={50}
              height={50}
              src={process.env.REACT_APP_API_URL + device.img}
            />
            <span>You added {device.name} in basket.</span>
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <GeneralModal
        show={basketModal}
        onHide={() => setBasketModal(false)}
        message={
          'You need to be a site user for adding to basket. Please login or do registration.'
        }
        title={'Opps..'}
      />
      <GeneralModal
        show={ratingModal}
        onHide={() => setRatingModal(false)}
        message={
          'You need to be a site user for rating a device. Please login or do registration.'
        }
        title={'Opps..'}
      />
      <GeneralModal
        show={commentsModal}
        onHide={() => setCommentsModal(false)}
        message={
          'You need to be a site user for commenting. Please login or do registration'
        }
        title={'Opps..'}
      />
    </Container>
  );
});

export default DevicePage;
