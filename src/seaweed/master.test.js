// to test
import Master from './master'

// exmample response of /vol/status?pretty=y
const response = {
    "Version": "30GB 2.80 7227cfdd",
    "Volumes": {
        "DataCenters": {
            "DefaultDataCenter": {
                "DefaultRack": {}
            },
            "homelab": {
                "pibox": {
                    "10.0.2.227:8080": [
                        {
                            "Id": 11,
                            "Size": 8,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 0,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 1,
                            "ModifiedAtSecond": 1638688394,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        },
                        {
                            "Id": 9,
                            "Size": 680,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 1,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 1,
                            "ModifiedAtSecond": 1638688394,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        },
                        {
                            "Id": 10,
                            "Size": 246416,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 5,
                            "DeleteCount": 1,
                            "DeletedByteCount": 71,
                            "ReadOnly": false,
                            "CompactRevision": 0,
                            "ModifiedAtSecond": 1638688079,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        }
                    ],
                    "10.0.2.228:8080": [
                        {
                            "Id": 7,
                            "Size": 253256,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 2,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 0,
                            "ModifiedAtSecond": 1638688091,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        },
                        {
                            "Id": 10,
                            "Size": 246416,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 5,
                            "DeleteCount": 1,
                            "DeletedByteCount": 71,
                            "ReadOnly": false,
                            "CompactRevision": 0,
                            "ModifiedAtSecond": 1638688079,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        },
                        {
                            "Id": 12,
                            "Size": 8,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 0,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 0,
                            "ModifiedAtSecond": 1638445143,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        }
                    ],
                    "10.0.2.229:8080": [
                        {
                            "Id": 7,
                            "Size": 253256,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 2,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 0,
                            "ModifiedAtSecond": 1638688091,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        },
                        {
                            "Id": 8,
                            "Size": 393712,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 5,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 1,
                            "ModifiedAtSecond": 1638688394,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        },
                        {
                            "Id": 11,
                            "Size": 8,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 0,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 1,
                            "ModifiedAtSecond": 1638688394,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        }
                    ],
                    "10.0.2.230:8080": [
                        {
                            "Id": 12,
                            "Size": 8,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 0,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 0,
                            "ModifiedAtSecond": 1638445143,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        },
                        {
                            "Id": 8,
                            "Size": 393712,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 5,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 1,
                            "ModifiedAtSecond": 1638688394,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        },
                        {
                            "Id": 9,
                            "Size": 680,
                            "ReplicaPlacement": {
                                "node": 1
                            },
                            "Ttl": {
                                "Count": 0,
                                "Unit": 0
                            },
                            "DiskType": "",
                            "Collection": "",
                            "Version": 3,
                            "FileCount": 1,
                            "DeleteCount": 0,
                            "DeletedByteCount": 0,
                            "ReadOnly": false,
                            "CompactRevision": 1,
                            "ModifiedAtSecond": 1638688394,
                            "RemoteStorageName": "",
                            "RemoteStorageKey": ""
                        }
                    ]
                }
            }
        },
        "Free": 863,
        "Max": 875
    }
}

describe('Master.getClusterInfo()', function () {
    it('should return a more concise response of cluster info', async function() {
        let requiredKeys = [
            "version",
            "freeVolumes",
            "maxVolumes",
            "datacenters",
            "racks",
            "nodes",
            "size"
        ]
        global.fetch = jest.fn().mockResolvedValue({ json: () => response})
        let clusterInfo = await Master.getClusterInfo()
        for (let key of requiredKeys) {
            expect(clusterInfo[key]).not.toEqual(undefined)
        }
    })
})