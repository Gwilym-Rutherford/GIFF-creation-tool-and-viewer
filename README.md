# GIFF-creation-tool-and-viewer
# What is GIFF
giff is the Gwilym Image File Format

The project will allow you to use a paint like interface to create custome images, store them as a .giff and then be able to open other .giff images.


# Header Structure

| Offset | Size (Bytes) | Name        | Description                                                                                              |
|--------|--------------|-------------|----------------------------------------------------------------------------------------------------------|
| 0x00   | 2            | Signature   | This is the file Signature, telling programs reading this file that it is of type .giff                  |
| 0x02   | 4            | FileSize    | This is the Size of the file in Bytes                                                                    |
| 0x06   | 4            | Compression | .giff in the future might support different file compression types, this will indicate which one is used |
| 0x0a   | 4            | Mode        | .giff in the future might support video like capabilities, this will indicate if it is an image or video |
| 0x0e   | 4            | Width       | The width of the image/video in pixels                                                                   |
| 0x12   | 4            | Height      | The height of the image/video in pixels                                                                  |

Headers Will always be of fixed size, 22 Bytes.
> <ins>**note that all Header data is stored in Big Endian form**</ins>
---

## Compression types

| Value | Description                                    |
|-------|------------------------------------------------|
| 0x01  | Raw uncompressed, rgb values stored with alpha |
| 0x02  | Run Length Encoding                            |
---

## Modes
| Value | Description                                    |
|-------|------------------------------------------------|
| 0x01  | Image                                          |
| 0x02  | Video                                          |
---

## Example

Here is an example header, let's split this down into each chunk of data  
  
47 52 00 0F 42 4E 00 00 00 01 00 00 00 01 00 00 01 F4 00 00 01 F4  

| Offset | Size (Bytes) | Name        | Raw data         | Interpreted data                                                                             |
|--------|--------------|-------------|------------------|-----------------------------------------------------------------------------------------------|
| 0x00   | 2            | Signature   | 47 52            | GR                                                                                              |
| 0x02   | 4            | FileSize    | 00 0F 42 4E     | 1000014 Bytes                                                                            |
| 0x06   | 4            | Compression | 00 00 00 01      | Raw uncompressed                                                                          |
| 0x0a   | 4            | Mode        | 00 00 00 01      | Image                                                                                     |
| 0x0e   | 4            | Width       | 00 00 01 F4      | 500 px Wide                                                                               |
| 0x12   | 4            | Height      | 00 00 01 F4      | 500 px High                                                                               |

