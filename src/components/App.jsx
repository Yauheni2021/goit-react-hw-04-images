import { fetchApi } from '../services/getApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { useState, useEffect } from 'react';
import { AppBox } from './App.styled';

import { Modal } from './Modal/Modal';


export const App = () => {
const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [maxPage, setMaxPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      try {
        fetchApi(query, page).then(resp => {
          setHits(prevState => [...prevState, ...resp.hits]);
          setMaxPage(Math.ceil(resp.totalHits / 12));
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  }, [page, query]);

  const openModal = img => {
    setShowModal(true);
    setLargeImage(img.largeImageURL);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const onSearchSubmit = data => {
    if (query === data) {
      return;
    }
    setQuery(data);
    setPage(1);
    setHits([]);
  };

  const onBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };


  
    return (
      <AppBox>
        <Searchbar onSubmit={onSearchSubmit} />
        {showModal && (
          <Modal onClose={closeModal}>
                <img src={largeImage} alt="" />
          </Modal>
        )}
        {hits.lenght > 0 && <ImageGallery hits={hits} openModal={openModal} />}
        <Loader isLoading={isLoading} />
        {page < maxPage && !isLoading && <Button onClick={onBtnClick}/>}
          
           
      </AppBox>
    );
};
  


// import Notiflix from 'notiflix';
// import { Searchbar } from './Searchbar/Searchbar';
// import { ImageGallery } from './ImageGallery/ImageGallery';
// import { Loader } from './Loader/Loader';
// import { Button } from './Button/Button';
// import { AppBox } from './App.styled';
// import { Modal } from './Modal/Modal';
// import { useState } from 'react';
// import { useEffect } from 'react';
// import { fetchApi } from 'services/getApi';

// const CARD_HEIGHT = 260;

// const notiflixOptions = Notiflix.Notify.init({
//   width: '400px',
//   position: 'top-right',
//   distance: '50px',
//   borderRadius: '10px',
//   clickToClose: true,
//   useIcon: false,
//   fontSize: '23px',
// });

// export const App = () => {
//   const [page, setPage] = useState(1);
//   const [queue, setQueue] = useState('');
//   const [hits, setHits] = useState([]);
//   const [loaderHidden, setLoaderHidden] = useState(true);
//   const [totalHits, setTotalHits] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [modalHidden, setModalHidden] = useState(true);
//   const [modalImg, setModalImg] = useState('');

//   const getRequest = data => {
//     setQueue(prevState => {
//       if (
//         prevState.toLowerCase().trim() === data.toLowerCase().trim() &&
//         data.toLowerCase().trim() !== ''
//       ) {
//         return Notiflix.Notify.info(
//           `You are already looking for ${data}. Change you request.`,
//           notiflixOptions
//         );
//       } else if (data.toLowerCase() === '') {
//         setQueue('');
//         return Notiflix.Notify.info(`Enter some request.`, notiflixOptions);
//       } else {
//         setPage(1);
//         setQueue(data);
//         setHits([]);
//         setTotalHits(0);
//       }
//     });
//   };

//   const toggleModal = largeImg => {
//     if (modalImg === '') {
//       setModalHidden(false);
//       return setModalImg(largeImg);
//     }
//     setModalHidden(true);
//     return setModalImg('');
//   };

//   const loadMore = () => {
//     setIsLoading(true);
//     setPage(prevState => prevState + 1);
//   };

//   useEffect(() => {
//     if (queue === '') {
//       return;
//     }

//     async function fetchImagesData() {
//       try {
//         setLoaderHidden(false);
//         const imagesData = await fetchApi(queue, page);
//         if (imagesData.totalHits === 0) {
//           return Notiflix.Notify.failure(
//             `Have no images on your request ${queue}`,
//             notiflixOptions
//           );
//         }
//         const images = imagesData.hits.map(item => {
//           let data = {
//             id: item.id,
//             webformatURL: item.webformatURL,
//             largeImageURL: item.largeImageURL,
//           };
//           return data;
//         });

//         if (imagesData.totalHits !== 0 && totalHits === 0) {
//           setTotalHits(imagesData.totalHits);
//           return Notiflix.Notify.success(
//             `Hooray! We found ${imagesData.totalHits} images.`,
//             notiflixOptions
//           );
//         }
//         if (page === 1) {
//           setHits(images);
//           return;
//         } else {
//           return setHits(prevState => [...prevState, ...images]);
//         }
//       } catch {
//         return Notiflix.Notify.failure(
//           'Oops something goes wrong, change your request or refresh page',
//           notiflixOptions
//         );
//       } finally {
//         setIsLoading(false);
//         setLoaderHidden(true);
//       }
//     }

//     fetchImagesData();

//     return;
//   }, [page, queue, totalHits]);

//   useEffect(() => {
//     if (page > 1) {
//       setTimeout(() => {
//         window.scrollBy({
//           top: CARD_HEIGHT * 2,
//           behavior: 'smooth',
//         });
//       }, 600);
//     }
//   }, [page]);

//   return (
//     <AppBox>
//       <Searchbar onSubmit={getRequest} />
//       {hits.length !== 0 && (
//         <ImageGallery
//           data={hits}
//           toggleModal={toggleModal}
//           isModalOpen={modalHidden}
//         />
//       )}
//       {!loaderHidden && <Loader />}
//       {hits.length < totalHits && (
//         <Button onClick={loadMore} loading={isLoading} />
//       )}
//       {!modalHidden && (
//         <Modal onClose={toggleModal}>
//           <img src={modalImg} alt="" />
//         </Modal>
//       )}
//     </AppBox>
//   );
// };