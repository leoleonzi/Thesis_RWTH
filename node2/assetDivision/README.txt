a. Steps to perform split file:

    1. Store the file to be splitted in the dir: ./../transfer_resources/merged
    2. Run: node split-files.js filename.ext nodesNumber
    3. The result will be placed in: ./../transfer_resources/splitted


b. Steps to merge the files:

    1. The files shold be stored in: ./../transfer_resources/splitted
    2. Run: node merge-files.js newFileName.ext
    3. The new merged file will be placed in ./../transfer_resources/merged


!! IMPORTANT:

    When you delete a file to run the code again be sure the file(s) are not just moved to trash.
    They should either be really deleted before, or have a different name than the files in the trash bin.