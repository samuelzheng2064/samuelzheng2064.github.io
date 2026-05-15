import { StateData } from './types';

// Merch image paths - easier to update in one place
// To use your own images: 
// 1. Upload images to a folder (e.g. public/images/)
// 2. Update these paths to something like '/images/your-image.png'
const MERCH_IMAGES = {
  UF: 'input_file_1.png', 
  USF: 'input_file_0.png',
};

export const FLORIDA_DATA: StateData = {
  id: 'FL',
  name: 'Florida',
  chapters: [
    {
      id: 'uf-chapter',
      name: 'University of Florida (UF) Chapter',
      shortName: 'UF',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Florida_Gators_logo.svg/512px-Florida_Gators_logo.svg.png',
      instagramUrl: 'https://www.instagram.com/ufgmma/',
      location: [-82.3433, 29.6436],
      merchFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdcatdWR3YQeTp5K5nR8wzldw5CQfTxt2BJUM4dI5gkZ6nYsQ/closedform',
      merchItems: [
         {
          id: 'uf-crewneck',
          name: 'Declare His Glory Crewneck',
          price: '$35.00',
          imageUrl: 'merch_img/uf_merch_2026.png', 
          description: 'Premium UF GMMA "Declare His Glory Among The Nations" crewneck sweatshirt.'
        }
      ]
    },
    {
      id: 'usf-chapter',
      name: 'University of South Florida (USF) Chapter',
      shortName: 'USF',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/South_Florida_Bulls_logo.svg/512px-South_Florida_Bulls_logo.svg.png',
      instagramUrl: 'https://www.instagram.com/usfgmma/',
      location: [-82.4131, 28.0587],
      merchFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdXW0rJkHk9X_vL7X8_Y1_Y_Y_Y_Y_Y_Y_Y_Y_Y_Y/viewform?embedded=true',
      merchItems: [
        {
          id: 'usf-tee',
          name: 'USF GMMA Chapter Tee',
          price: '$20.00',
          imageUrl: 'merch_img/example_usf_merch.png', 
          description: 'Official USF GMMA classic green chapter t-shirt.'
        }
      ]
    }
  ]
};
