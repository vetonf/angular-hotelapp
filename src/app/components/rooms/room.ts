export interface Room {
    totalRooms: number,
    availableRooms?: number, // optional, see how it can be checked in the HTML
    bookedRooms: number,
}

/**
 * interface for hard coded database (roomNumber is type of 'number')
export interface RoomList {
    roomType: string,
    roomNumber: number,
    amenities: string,
    price: number,
    photos: string,
    checkinTime: Date,
    checkoutTime: Date,
    rating: number,
}
 */

// interface for backend API
export interface RoomList {
    roomType: string,
    roomNumber: string,
    amenities: string,
    price: number,
    photos: string,
    checkinTime: Date,
    checkoutTime: Date,
    rating: number,
}

// interface for photos for 'Fake JSON API'
export interface Photos {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}
