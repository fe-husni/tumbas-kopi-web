document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [
      {
        id: 1,
        name: 'Aceh Gayo Wine Process - Kopi Arabica (200g)',
        img: 'gayo-kopi.jpg',
        price: 93000,
      },
      {
        id: 2,
        name: 'Kopi Robusta Temanggung (200g)',
        img: 'robusta-temanggung.jpg',
        price: 74000,
      },
      {
        id: 3,
        name: 'Full Robusta Premium House Blend - Otten Coffee (1kg)',
        img: 'robusta-premium.jpg',
        price: 133000,
      },
      {
        id: 4,
        name: 'Biji Bubuk Kopi Arabica Robusta - Crema Espresso (1kg)',
        img: 'crema-espresso.jpg',
        price: 235000,
      },
      {
        id: 5,
        name: 'Kopi Susu Blend - Otten Coffee (500gr)',
        img: 'kopisusu-blend.jpg',
        price: 74000,
      },
      {
        id: 6,
        name: 'Premium Taste - Kopi House Blend (1kg)',
        img: 'premium-taste.jpg',
        price: 195000,
      },
    ],
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di shopping-cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // Jika belum ada/cart kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // Jika barang sudah ada, cek apakah barang berbeda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah quantity & totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
      console.log(this.items);
    },

    remove(id) {
      // ambil item yang mau diremove berdasarkan id
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // Telusuri 1 1
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // jika barang sisa satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// Convert Currency to Rp.
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};
